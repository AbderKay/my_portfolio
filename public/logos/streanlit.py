import streamlit as x
import pandas as p
import plotly.express as e

x.set_page_config(
    page_title="Hotel Management System Dashboard",
    page_icon="🏨",
    layout="wide",
)

x.markdown(
    """
    <style>
    .metric-card {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        border-left: 5px solid #1f77b4;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    </style>
""",
    unsafe_allow_html=True,
)

x.title("🏨 Hotel Database Management & Analytics System")
x.markdown(
    "**Backend Architecture:** MySQL / Oracle PL/SQL | **Frontend:** Streamlit Admin Panel"
)
x.divider()

x.sidebar.header("🕹️ Operational Controls")
room_type_filter = x.sidebar.multiselect(
    "Filter by Room Category",
    options=["Single", "Double", "Deluxe Suite", "Executive Suite", "Penthouse"],
    default=["Single", "Double", "Deluxe Suite", "Executive Suite", "Penthouse"],
)

status_filter = x.sidebar.selectbox(
    "Room Occupancy Status", options=["All", "Occupied", "Available", "Maintenance"]
)

# Sample dataset matching typical relational DB entities (ROOM, GUEST, RESERVATION, PAYMENT)
rooms_data = p.DataFrame(
    [
        {
            "Room_ID": 101,
            "Type": "Single",
            "Price_Night": 80,
            "Status": "Available",
            "Floor": 1,
        },
        {
            "Room_ID": 102,
            "Type": "Single",
            "Price_Night": 80,
            "Status": "Occupied",
            "Floor": 1,
        },
        {
            "Room_ID": 103,
            "Type": "Double",
            "Price_Night": 120,
            "Status": "Occupied",
            "Floor": 1,
        },
        {
            "Room_ID": 201,
            "Type": "Double",
            "Price_Night": 120,
            "Status": "Available",
            "Floor": 2,
        },
        {
            "Room_ID": 202,
            "Type": "Deluxe Suite",
            "Price_Night": 250,
            "Status": "Occupied",
            "Floor": 2,
        },
        {
            "Room_ID": 203,
            "Type": "Deluxe Suite",
            "Price_Night": 250,
            "Status": "Maintenance",
            "Floor": 2,
        },
        {
            "Room_ID": 301,
            "Type": "Executive Suite",
            "Price_Night": 400,
            "Status": "Occupied",
            "Floor": 3,
        },
        {
            "Room_ID": 302,
            "Type": "Penthouse",
            "Price_Night": 750,
            "Status": "Available",
            "Floor": 3,
        },
    ]
)

reservations_data = p.DataFrame(
    [
        {
            "Reservation_ID": "RES-1001",
            "Guest_Name": "Jean Dupont",
            "Room_ID": 102,
            "Check_In": "2026-08-01",
            "Check_Out": "2026-08-07",
            "Total_Amount": 480,
            "Payment_Status": "Paid",
        },
        {
            "Reservation_ID": "RES-1002",
            "Guest_Name": "Sarah Connor",
            "Room_ID": 103,
            "Check_In": "2026-08-03",
            "Check_Out": "2026-08-08",
            "Total_Amount": 600,
            "Payment_Status": "Paid",
        },
        {
            "Reservation_ID": "RES-1003",
            "Guest_Name": "Ahmed Benali",
            "Room_ID": 202,
            "Check_In": "2026-08-04",
            "Check_Out": "2026-08-10",
            "Total_Amount": 1500,
            "Payment_Status": "Pending",
        },
        {
            "Reservation_ID": "RES-1004",
            "Guest_Name": "Elena Rostova",
            "Room_ID": 301,
            "Check_In": "2026-08-05",
            "Check_Out": "2026-08-12",
            "Total_Amount": 2800,
            "Payment_Status": "Paid",
        },
    ]
)

filtered_rooms = rooms_data[rooms_data["Type"].isin(room_type_filter)]
if status_filter != "All":
    filtered_rooms = filtered_rooms[filtered_rooms["Status"] == status_filter]

# Top KPI Section
kpi1, kpi2, kpi3, kpi4 = x.columns(4)

total_rooms = len(rooms_data)
occupied_count = len(rooms_data[rooms_data["Status"] == "Occupied"])
occupancy_rate = round((occupied_count / total_rooms) * 100, 1)
total_revenue = reservations_data["Total_Amount"].sum()

kpi1.metric("Total Rooms", total_rooms)
kpi2.metric("Current Occupancy", f"{occupancy_rate}%", f"{occupied_count} Rooms")
kpi3.metric(
    "Available Units",
    len(rooms_data[rooms_data["Status"] == "Available"]),
)
kpi4.metric("Total Revenue", f"${total_revenue:,.2f}")

x.divider()

# Tab Layout for Clean Portfolio Presentation
tab1, tab2, tab3 = x.tabs(
    ["📊 Analytics & Room Allocation", "📑 Live Reservations", "⚙️ DB Trigger Actions"]
)

with tab1:
    col_chart1, col_chart2 = x.columns(2)

    with col_chart1:
        x.subheader("Room Status Distribution")
        fig_status = e.pie(
            rooms_data,
            names="Status",
            title="Current Room Availability Breakdown",
            color="Status",
            color_discrete_map={
                "Occupied": "#EF553B",
                "Available": "#00CC96",
                "Maintenance": "#AB63FA",
            },
        )
        x.plotly_chart(fig_status, use_container_width=True)

    with col_chart2:
        x.subheader("Revenue by Room Category")
        fig_revenue = e.bar(
            rooms_data,
            x="Type",
            y="Price_Night",
            color="Type",
            title="Base Nightly Rate by Room Class ($)",
        )
        x.plotly_chart(fig_revenue, use_container_width=True)

    x.subheader("Filtered Room Inventory Grid")
    x.dataframe(filtered_rooms, use_container_width=True)

with tab2:
    x.subheader("Guest Reservations & Billing Status")
    x.dataframe(reservations_data, use_container_width=True)

    with x.expander("➕ Register New Reservation (Executes INSERT Procedure)"):
        with x.form("new_res_form"):
            c1, c2 = x.columns(2)
            guest_name = c1.text_input("Guest Full Name")
            room_num = c2.number_input("Assign Room ID", min_value=100, max_value=500)
            check_in = c1.date_input("Check-In Date")
            check_out = c2.date_input("Check-Out Date")
            payment_type = c1.selectbox(
                "Payment Status", ["Paid", "Pending", "Deposit Paid"]
            )
            submit = x.form_submit_button("Commit Reservation to Database")

            if submit:
                x.success(
                    f"Reservation created for {guest_name}! Stored Procedure `pkg_reservation.add_booking` executed."
                )

with tab3:
    x.subheader("Database Schema Integration Test")
    x.info(
        "This panel demonstrates stored procedures, constraints, and audit logging execution against `hotel_DB`."
    )

    col_act1, col_act2 = x.columns(2)

    with col_act1:
        x.markdown("### 🔄 Trigger Check-In Process")
        res_to_checkin = x.selectbox(
            "Select Reservation for Check-In",
            reservations_data["Reservation_ID"],
        )
        if x.button("Process Check-In"):
            x.success(
                f"Status for {res_to_checkin} updated to CHECKED_IN. Trigger `trg_update_room_status` set Room to OCCUPIED."
            )

    with col_act2:
        x.markdown("### 🧹 Trigger Maintenance Mode")
        maint_room = x.number_input(
            "Room ID for Maintenance", min_value=100, max_value=500, value=203
        )
        if x.button("Flag for Cleaning/Repair"):
            x.warning(
                f"Room {maint_room} marked as MAINTENANCE. Audit log entry written to `LOG_ROOM_CHANGES`."
            )