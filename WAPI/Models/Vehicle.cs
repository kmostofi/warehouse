using System;
using System.Collections.Generic;

namespace WAPI.Models
{
    public partial class Vehicle
    {
        public long Id { get; set; }
        public long? Warehouseid { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public long? YearModel { get; set; }
        public double? Price { get; set; }
        public byte[] Licensed { get; set; }
        public string DateAdded { get; set; }

        public Vehicle()
        {

        }

        public Vehicle(long id, long? warehouseid, string make, string model, long? yearModel, double? price, byte[] licensed, string dateAdded)
        {
            Id = id;
            Warehouseid = warehouseid;
            Make = make;
            Model = model;
            YearModel = yearModel;
            Price = price;
            Licensed = licensed;
            DateAdded = dateAdded;
        }
    }
}
