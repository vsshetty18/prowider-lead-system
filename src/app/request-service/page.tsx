"use client";

import { useState } from "react";

export default function Page() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    description: "",
    serviceId: 1,
  });

  async function submitForm() {

    const response = await fetch(
      "/api/leads",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    alert(JSON.stringify(data));

  }

  return (
    <div className="p-10 flex flex-col gap-4">

      <input
        className="border p-2"
        placeholder="Name"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        className="border p-2"
        placeholder="Phone"
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
      />

      <input
        className="border p-2"
        placeholder="City"
        onChange={(e) =>
          setForm({
            ...form,
            city: e.target.value,
          })
        }
      />

      <textarea
        className="border p-2"
        placeholder="Description"
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <select
        className="border p-2"
        onChange={(e) =>
          setForm({
            ...form,
            serviceId: Number(
              e.target.value
            ),
          })
        }
      >
        <option value={1}>
          Service 1
        </option>

        <option value={2}>
          Service 2
        </option>

        <option value={3}>
          Service 3
        </option>

      </select>

      <button
        className="bg-black text-white p-2"
        onClick={submitForm}
      >
        Submit
      </button>

    </div>
  );

}
