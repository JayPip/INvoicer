using Microsoft.AspNetCore.Identity;

namespace ProductsApp.Models
{
    public class User: IdentityUser
    {
        public string? Nickname { get; set; }
    }
}
