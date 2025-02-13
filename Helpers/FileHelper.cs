
namespace ProductsApp.Helpers;

public class FileHelper
{
    public static string ConvertImageToBase64(string imagePath)
    {
        byte[] imageBytes = File.ReadAllBytes(imagePath);
        return Convert.ToBase64String(imageBytes);
    }

    public static void ConvertPdfToJpg(string pdfPath, string outputImagePath)
    {
        //To implement
    }
}