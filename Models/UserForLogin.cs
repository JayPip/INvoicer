using System.ComponentModel.DataAnnotations;

namespace ProductsApp.Models
{
    public class UserForLogin
    {
        [Required(ErrorMessage = "Username is required.")]
        public string? Nickname { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }
    }
}
