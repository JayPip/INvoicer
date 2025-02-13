namespace ProductsApp.Models;

public class UserFile
{
    public int Id { get; set; }
    public string UserId { get; set; }  // Foreign key linking to User
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public DateTime UploadDate { get; set; }
}