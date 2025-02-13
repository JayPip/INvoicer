using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ProductsApp.Models;

public class Invoice
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string FileName { get; set; }
    public float PriceGross { get; set; }
    public float PriceNet { get; set; }
    public float TaxAmount => PriceGross - PriceNet;
    [JsonConverter(typeof(IsoDateTimeConverter))]
    public DateTime IssueDate { get; set; }
    [JsonConverter(typeof(IsoDateTimeConverter))]
    public DateTime DueDate { get; set; }
}