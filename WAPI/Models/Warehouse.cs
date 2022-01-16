using System;
using System.Collections.Generic;

namespace WAPI.Models
{
    public partial class Warehouse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double? LocationLat { get; set; }
        public double? LocationLong { get; set; }
        public string CarsLocation { get; set; }

        public Warehouse()
        {

        }

        public Warehouse(long id, string name, double? locationLat, double? locationLong, string carsLocation)
        {
            Id = id;
            Name = name;
            LocationLat = locationLat;
            LocationLong = locationLong;
            CarsLocation = carsLocation;
        }
    }
}
