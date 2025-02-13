using Microsoft.AspNetCore.Mvc;

namespace ProductsApp.Controllers;

public class FileController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}