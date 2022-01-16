using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WAPI.Models;

namespace WAPI.Data
{
    public partial class WarehouseDbContext : DbContext
    {
        public WarehouseDbContext()
        {
        }

        public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<Warehouse> Warehouses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.HasIndex(e => e.Id, "IX_Vehicles__id")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("_id");

                entity.Property(e => e.DateAdded)
                    .HasColumnType("VARCHAR")
                    .HasColumnName("date_added");

                entity.Property(e => e.Licensed)
                    .HasColumnType("BOOL")
                    .HasColumnName("licensed");

                entity.Property(e => e.Make)
                    .HasColumnType("VARCHAR")
                    .HasColumnName("make");

                entity.Property(e => e.Model)
                    .HasColumnType("VARCHAR")
                    .HasColumnName("model");

                entity.Property(e => e.Price)
                    .HasColumnType("FLOAT")
                    .HasColumnName("price");

                entity.Property(e => e.Warehouseid).HasColumnName("_warehouseid");

                entity.Property(e => e.YearModel)
                    .HasColumnType("INT")
                    .HasColumnName("year_model");
            });

            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.ToTable("Warehouse");

                entity.HasIndex(e => e.Id, "IX_Warehouse__id")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("_id");

                entity.Property(e => e.CarsLocation)
                    .HasColumnType("VARCHAR")
                    .HasColumnName("cars_location");

                entity.Property(e => e.LocationLat)
                    .HasColumnType("FLOAT")
                    .HasColumnName("location_lat");

                entity.Property(e => e.LocationLong)
                    .HasColumnType("FLOAT")
                    .HasColumnName("location_long");

                entity.Property(e => e.Name)
                    .HasColumnType("VARCHAR")
                    .HasColumnName("name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        //      protected override void OnConfiguring(DbContextOptionsBuilder options)
        // => options.UseSqlite(connectionString: "Filename=Warehouse.sqlite");
    }
}
