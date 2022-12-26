using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsApp.Data;
using ProductsApp.Models;

namespace ProductsApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly AppDbContext _appDbContext;
        public ProductsController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _appDbContext.Products.ToListAsync();
            return Ok(products);
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody]Product newProduct)
        {
             await _appDbContext.Products.AddAsync(newProduct);
            await _appDbContext.SaveChangesAsync();
            return Ok(newProduct);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id) {
            var product = await _appDbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            if(product == null)return NotFound();
            return Ok(product);
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, Product updatedProduct) {
            var product = await _appDbContext.Products.FindAsync(id);
            return Ok(product);
        }
    }
}
