using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using ProductsApp.Data;
using ProductsApp.Models;
using ProductsApp.Helpers;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ProductsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoiceController : Controller
{
    
    private readonly AppDbContext _appDbContext;
    private readonly string OpenAiApiUrl = "https://api.openai.com/v1/chat/completions";
    string _apiKey;
    private readonly HttpClient _httpClient;
    public InvoiceController(AppDbContext appDbContext,IConfiguration configuration)
    {
        _appDbContext = appDbContext;
        _httpClient = new HttpClient();
        _apiKey = configuration["OpenAiApiKey"];
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
    }
    private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
    private readonly string _uploadImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
    private readonly string _apiCall = "https://localhost:7118/api/";
    
    [HttpPost("upload")]
    [Consumes("multipart/form-data")] // <-- Add this to fix Swagger
    public async Task<IActionResult> UploadPdf([FromForm] IFormFile userFile)
    {
        if (userFile == null || userFile.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var fileName = $"{userId}_{Guid.NewGuid()}";
        
        try
        {
            // Ensure the "uploads" directory exists
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
            Console.WriteLine(_uploadPath);
            // Generate unique file name
            var filePath = Path.Combine(_uploadPath, fileName) + Path.GetExtension(userFile.FileName);
            
            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await userFile.CopyToAsync(stream);
            }
            
            var uploadedFile = new UserFile
            {
                UserId = userId,
                FileName = fileName,
                FilePath = filePath,
                UploadDate = DateTime.UtcNow
            };
            
            _appDbContext.UserFiles.Add(uploadedFile);
            await _appDbContext.SaveChangesAsync();
            return Ok(new { message = "PDF uploaded successfully", file = uploadedFile.FileName});
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    
    [Authorize]
    [HttpGet("get-file/{filename}")]
    public async Task<IActionResult> GetUserFileByFilename(string filename)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        var file = await _appDbContext.UserFiles
            .FirstOrDefaultAsync(f => f.FileName == filename && f.UserId == userId);

        if (file == null)
        {
            return NotFound("File not found or access denied.");
        }

        return Ok(new { file.Id, file.FileName, file.FilePath, file.UploadDate });
    }
    
    [Authorize]
    [HttpGet("get-invoice/{filename}")]
    public async Task<IActionResult> GetUserInvoiceByFilename(string filename)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        var invoice = await _appDbContext.Invoices
            .FirstOrDefaultAsync(f => f.FileName == filename && f.UserId == userId);

        if (invoice == null)
        {
            return NotFound("File not found or access denied.");
        }

        return Ok(new { invoice.PriceGross, invoice.PriceNet, invoice.IssueDate, invoice.DueDate, invoice.TaxAmount });
    }
    [Authorize]
    [HttpGet("get-files")]
    public async Task<IActionResult> GetUserFiles()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        var files = await _appDbContext.UserFiles
            .Where(f => f.UserId == userId)
            .Select(f => new 
            { 
                f.Id, 
                f.FileName, 
                f.FilePath, 
                f.UploadDate 
            })
            .ToListAsync();

        if (files == null || !files.Any())
        {
            return NotFound("No files found.");
        }

        return Ok(files);
    }
    [Authorize]
    [HttpGet("get-invoices")]
    public async Task<IActionResult> GetUserInvoices()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        var invoices = await _appDbContext.Invoices
            .Where(f => f.UserId == userId)
            .Select(f => new 
            { 
                f.FileName, 
                f.PriceGross, 
                f.PriceNet,
                f.TaxAmount,
                f.IssueDate,
                f.DueDate
            })
            .ToListAsync();

        if (invoices == null || !invoices.Any())
        {
            return NotFound("No files found.");
        }

        return Ok(invoices);
    }
    
    [Authorize]
    [HttpDelete("delete-file/{fileName}")]
    public async Task<IActionResult> DeleteUserFile(string fileName)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        var file = await _appDbContext.UserFiles
            .FirstOrDefaultAsync(f => f.UserId == userId && f.FileName == fileName);

        if (file == null)
        {
            return NotFound("File not found or access denied.");
        }
        
        _appDbContext.UserFiles.Remove(file);
        await _appDbContext.SaveChangesAsync();
        
        // Delete the file from the system
        if (System.IO.File.Exists(file.FilePath))
        {
            System.IO.File.Delete(file.FilePath);
        }

        return Ok(new { message = "File deleted successfully." });
    }
    [Authorize]
    [HttpDelete("delete-invoice/{fileName}")]
    public async Task<IActionResult> DeleteUserInvoice(string fileName)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        var file = await _appDbContext.Invoices
            .FirstOrDefaultAsync(f => f.UserId == userId && f.FileName == fileName);

        if (file == null)
        {
            return NotFound("File not found or access denied.");
        }
        
        _appDbContext.Invoices.Remove(file);
        await _appDbContext.SaveChangesAsync();
        
        return Ok(new { message = "Invoice deleted successfully." });
    }

    
    [Authorize]
    [HttpGet("download-file/{filename}")]
    public async Task<IActionResult> DownloadFile(string filename)
    {
        
       // var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var file = await _appDbContext.UserFiles
            .FirstOrDefaultAsync(f => f.FileName == filename );

        if (file == null)
        {
            return NotFound("File not found or access denied.");
        }

        var fileBytes = await System.IO.File.ReadAllBytesAsync(file.FilePath);
        return File(fileBytes, "application/octet-stream", file.FileName);
    }
    
    [HttpGet("create-invoice/{filename}")]
    public async Task<IActionResult> CreateInvoice(string filename)
    {
        if (filename == null || filename.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        try
        {
            var response = await AnalyzeImage(filename);
            
            // 2. Deserialize JSON response
            string json = await response.Content.ReadAsStringAsync();
            var settings = new JsonSerializerSettings
            {
                Converters = { new IsoDateTimeConverter { DateTimeFormat = "dd.MM.yyyy" } }
            };
            Invoice newInvoice = JsonConvert.DeserializeObject<Invoice>(json, settings);

            newInvoice.UserId = userId;
            newInvoice.FileName = filename;
            
            
            _appDbContext.Invoices.Add(newInvoice);
            await _appDbContext.SaveChangesAsync();
            return Ok(new { newInvoice.FileName, newInvoice.PriceGross, newInvoice.PriceNet, newInvoice.IssueDate, newInvoice.DueDate });
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to create invoice: {filename}", ex);
        }
    }
    
    [Authorize]
    [HttpGet("analyze/{filename}")]
    public async Task<HttpResponseMessage> AnalyzeImage( string filename)
    {
        if (string.IsNullOrEmpty(filename) )
        {
            return new HttpResponseMessage( HttpStatusCode.InternalServerError);
        }

        UserFile file = await _appDbContext.UserFiles.FirstOrDefaultAsync(f => f.FileName == filename );
        
        string base64Image = FileHelper.ConvertImageToBase64(_uploadPath + "/" + file.FileName + Path.GetExtension(file.FilePath));
        
        try
        {

            var requestBody = new
            {
                model = "gpt-4o-mini",
                messages = new object[]
                {
                    new
                    {
                        role = "system",
                        content = new[]
                        {
                            new { type = "text", text = "Jesteś asystentem, który podaje informacje zawarte w fakturze" }
                        }
                    },
                    new
                    {
                        role = "user",
                        content = new object[]
                        {
                            new { type = "text", text = "Proszę podaj:\n{PriceGross}\n{PriceNet}\n{IssueDate}\n{DueDate\n zawartą w fakturze i przedstaw te dane w formie json bez dodatkowego tekstu. Dont use characters like ''' and json before response json string. In prices dont use currency "  },
                            new { type = "image_url", image_url = new { url = $"data:image/jpeg;base64,{base64Image}" } }
                        }
                    }
                }
            };

            string jsonBody = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync(OpenAiApiUrl, content);
            string responseText = await response.Content.ReadAsStringAsync();// Deserialize JSON response
            
            using JsonDocument doc = JsonDocument.Parse(responseText);
            
            JsonElement root = doc.RootElement;

            // Extract "content" from choices[0].message.content
            string extractedContent = root.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(extractedContent, Encoding.UTF8, "application/json")
            };
        }
        catch (Exception ex)
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError);
        }
    }
}