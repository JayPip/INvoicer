namespace ProductsApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double TaxRate { get; set; } 
        public double TaxAmount => Price * (TaxRate / 100);
        public double PriceTax => Price + TaxAmount;
    }
}
