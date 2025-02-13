using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProductsApp.Models;

namespace ProductsApp.Data
{
    public class AppDbContext: IdentityDbContext<User>

    {
        public AppDbContext(DbContextOptions options) : base(options) { 
        
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<UserFile> UserFiles { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
    }
}
