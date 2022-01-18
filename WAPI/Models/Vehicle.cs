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
        public Boolean Licensed { get; set; }
        public string DateAdded { get; set; }
        public string Location { get; set; }
        public string Warehouse { get; set; }
        public Vehicle()
        {

        }

        public Vehicle(long id, long? warehouseid,
            string make, string model, long? yearModel,
            double? price, Boolean licensed, string dateAdded,
            string location, string warehouse)
        {
            Id = id;
            Warehouseid = warehouseid;
            Make = make;
            Model = model;
            YearModel = yearModel;
            Price = price;
            Licensed = licensed;
            DateAdded = dateAdded;
            Location = location;
            Warehouse = warehouse;
        }
    }
}
