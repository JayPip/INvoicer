using Microsoft.EntityFrameworkCore;
using ProductsApp.Models;

namespace ProductsApp.Data
{
    public class AppDbContext: DbContext

    {
        public AppDbContext(DbContextOptions options) : base(options) { 
        
        }

        public DbSet<Product> Products { get; set; }
    }
}
