using Microsoft.AspNetCore.Mvc;
using ProductsApp.Data;

namespace ProductsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoiceController : Controller
{
    private readonly AppDbContext _appDbContext;
    public InvoiceController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;

    }
    private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

    [HttpPost("upload")]
    [Consumes("multipart/form-data")] // <-- Add this to fix Swagger
    public async Task<IActionResult> UploadPdf([FromForm] IFormFile pdfFile)
    {
        if (pdfFile == null || pdfFile.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            // Ensure the "uploads" directory exists
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }

            // Generate unique file name
            var filePath = Path.Combine(_uploadPath, $"{pdfFile.FileName}");

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            return Ok(new { message = "PDF uploaded successfully", filePath });
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}