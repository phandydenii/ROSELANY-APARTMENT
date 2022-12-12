﻿using Microsoft.Reporting.WebForms;
using SCHOOL_MANAGEMENT_SYSTEM.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace SCHOOL_MANAGEMENT_SYSTEM.Controllers
{
    public class ReportController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private ApplicationDbContext _context;

        public ReportController()
        {
            _context = new ApplicationDbContext();
        }
        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }
        public ActionResult Index()
        {
            return View();
        }

        [Route("invoice-report")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\INVOICE_REPORT.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("invoice-rpt")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Report1.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("staff-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\STAFF_REPORT.rdlc";
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("guest-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\GUEST_REPORT.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("item-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\ITEM_REPORT.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }


        [Route("user-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\USER_REPORT.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("employee-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\EmployeeRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }


        [Route("shift-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\ShiftRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("grade-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\GradeRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }


        [Route("course-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\CourseRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("studylanguage-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\StudyLanguageRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("period-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\StudyPeriodRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("exchange-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\ExchangeRateRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("student-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\StudentRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }


        [Route("appropriate-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\AppropriateRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("emergency-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\EmergencyRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("student-parrent-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\ParrentStudentsRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("register-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\RegisterVRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("payment-summary-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            adp.Fill(ds);
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\PaymentReportRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }

        [Route("payment-list-by-date/{fromdate}/{todate}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.SelectCommand.Parameters.Add("@from",SqlDbType.Date).Value= fromdate;
            adp.SelectCommand.Parameters.Add("@to", SqlDbType.Date).Value= todate;
            adp.Fill(ds);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\PaymentReportRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }

        [Route("paymentdetail-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            //adp.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            //adp.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp.Fill(ds);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            //ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            //ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\PaymentDetailRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }

        [Route("paymentdetail-list-by-date/{fromdate}/{todate}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            adp.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp.Fill(ds);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\PaymentDetailRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }









        //Report New
        [Route("customer-invoice/{invoiceid}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            DataTable ds2 = new DataTable();
            ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\InvoiceRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("customer-invoice-return/{invoiceid}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            
            ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\InvoiceReturnRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("customer-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\CustomerRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("category-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            ReportViewer reportViewer = new ReportViewer();
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\CategoryRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("product-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            ReportViewer reportViewer = new ReportViewer();
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\ProductRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("position-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            ReportViewer reportViewer = new ReportViewer();
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\PositionRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("showroom-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            ReportViewer reportViewer = new ReportViewer();
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\ShowroomRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("location-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            ReportViewer reportViewer = new ReportViewer();
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\LocationRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("invoice-summary-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.Fill(ds);

            DataTable ds2 = new DataTable();
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Invoice_summaryRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }


        [Route("invoice-summary-by-date/{fromdate}/{todate}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            adp.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp.Fill(ds);
            adp2.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            adp2.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp2.Fill(ds2);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Invoice_summaryRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }

        [Route("invoice-detail-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            adp.Fill(ds);
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Invoice_detailRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }


        [Route("invoice-detail-by-date/{fromdate}/{todate}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            adp.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp.Fill(ds);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Invoice_detailRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }

        [Route("invoice-return-detail-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            adp.Fill(ds);
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Invoice_return_detailRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }


        [Route("invoice-return-detail-by-date/{fromdate}/{todate}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            adp.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp.Fill(ds);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Invoice_return_detailRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }


        [Route("collectmoney-invoice/{invoiceid}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            
            //ReportParameter staff = new ReportParameter("staff", User.Identity.Name);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\CollectMoneyRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));
        }

        [Route("invoice-money-list")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            adp.Fill(ds);
            //ReportParameter qrCODE = new ReportParameter("qrCODE", base64String);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Collect_Money_summaryRpt.rdlc";
            //reportViewer.LocalReport.SetParameters(new ReportParameter[] { staffname, from, to, khmerDate, khmerYear, qrCODE });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }

        [Route("money-detail-by-date/{fromdate}/{todate}")]
            DataTable ds = new DataTable();
            var connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            adp.SelectCommand.Parameters.AddWithValue("@from", fromdate);
            adp.SelectCommand.Parameters.AddWithValue("@to", todate);
            adp.Fill(ds);
            ReportParameter staff = new ReportParameter("user", User.Identity.Name);
            ReportParameter fromd = new ReportParameter("fromdate", fromdate);
            ReportParameter tod = new ReportParameter("todate", todate);
            //reportViewer.LocalReport.EnableExternalImages = true;
            reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Collect_Money_summaryRpt.rdlc";
            reportViewer.LocalReport.SetParameters(new ReportParameter[] { staff, fromd, tod });
            reportViewer.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", ds));

        }
    }
}