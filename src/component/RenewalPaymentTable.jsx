import React, { useState } from "react";
import "../css/RenewalPaymentTable.css";

const RenewalPaymentTable = () => {
  const [rows, setRows] = useState([
    {
      orderNo: "",
      location: "",
      locationConfirmed: false,
      name: "",
      email: "",
      phone: "",
      address: "",
      plan: "",
      renewalMonth: "",
      amountPaid: "",
      transactionId: "",
      paymentMode: "",
      deliveryBoyName: "",
      deliveryBoyPhone: "",
      deliveryDate: "",
      deliveryTime: "",
      officeDate: "",
      officeTime: "",
      note: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        orderNo: "",
        location: "",
        locationConfirmed: false,
        name: "",
        email: "",
        phone: "",
        address: "",
        plan: "",
        renewalMonth: "",
        amountPaid: "",
        transactionId: "",
        paymentMode: "",
        deliveryBoyName: "",
        deliveryBoyPhone: "",
        deliveryDate: "",
        deliveryTime: "",
        officeDate: "",
        officeTime: "",
        note: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <div className="payment-table-container">
      <h2 className="payment-table-title">Renewal Payment Details</h2>

      <div className="table-scroll">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Location</th>
              <th>Confirmed</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Plan</th>
              <th>Renewal Month</th>
              <th>Amount Paid</th>
              <th>Transaction ID</th>
              <th>Payment Mode</th>
              <th>Delivery Boy Name</th>
              <th>Delivery Boy Phone</th>
              <th>Delivery Date</th>
              <th>Delivery Time</th>
              <th>Office Date</th>
              <th>Office Time</th>
              <th>Note</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={row.orderNo}
                    onChange={(e) =>
                      handleChange(index, "orderNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.location}
                    onChange={(e) =>
                      handleChange(index, "location", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.locationConfirmed}
                    onChange={(e) =>
                      handleChange(index, "locationConfirmed", e.target.checked)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.phone}
                    onChange={(e) => handleChange(index, "phone", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.address}
                    onChange={(e) =>
                      handleChange(index, "address", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.plan}
                    onChange={(e) => handleChange(index, "plan", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.renewalMonth}
                    onChange={(e) =>
                      handleChange(index, "renewalMonth", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.amountPaid}
                    onChange={(e) =>
                      handleChange(index, "amountPaid", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.transactionId}
                    onChange={(e) =>
                      handleChange(index, "transactionId", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.paymentMode}
                    onChange={(e) =>
                      handleChange(index, "paymentMode", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.deliveryBoyName}
                    onChange={(e) =>
                      handleChange(index, "deliveryBoyName", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.deliveryBoyPhone}
                    onChange={(e) =>
                      handleChange(index, "deliveryBoyPhone", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.deliveryDate}
                    onChange={(e) =>
                      handleChange(index, "deliveryDate", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={row.deliveryTime}
                    onChange={(e) =>
                      handleChange(index, "deliveryTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={row.officeDate}
                    onChange={(e) =>
                      handleChange(index, "officeDate", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={row.officeTime}
                    onChange={(e) =>
                      handleChange(index, "officeTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.note}
                    onChange={(e) => handleChange(index, "note", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-row-btn" onClick={addRow}>
        + Add Row
      </button>
    </div>
  );
};

export default RenewalPaymentTable;
