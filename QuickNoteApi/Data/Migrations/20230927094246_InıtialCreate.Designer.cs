﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using QuickNoteApi.Data;

#nullable disable

namespace QuickNoteApi.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230927094246_InıtialCreate")]
    partial class InıtialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("QuickNoteApi.Data.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Notes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Content = "Discuss project updates and assign tasks.",
                            Title = "Meeting Agenda"
                        },
                        new
                        {
                            Id = 2,
                            Content = "Buy milk, eggs, bread, and vegetables.",
                            Title = "Grocery List"
                        },
                        new
                        {
                            Id = 3,
                            Content = "Read 'The Alchemist' and 'The Silent Patient'.",
                            Title = "Book Recommendations"
                        },
                        new
                        {
                            Id = 4,
                            Content = "Flight at 2:00 PM, hotel check-in at 4:00 PM.",
                            Title = "Travel Itinerary"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
