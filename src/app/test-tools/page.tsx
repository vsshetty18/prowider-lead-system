"use client";

export default function Page() {

  async function resetQuota() {

    await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        eventId:
          crypto.randomUUID(),
      }),
    });

    alert("Reset Complete");

  }

  async function testDuplicate() {

    const eventId = "same-event";

    await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        eventId,
      }),
    });

    await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        eventId,
      }),
    });

    alert("Duplicate Tested");

  }

  async function generateLeads() {

    await Promise.all(

      Array.from({
        length: 10,
      }).map((_, i) =>

        fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: `User ${i}`,
            phone: `9999${i}`,
            city: "Bangalore",
            description: "Testing",
            serviceId: 1,
          }),
        })

      )

    );

    alert("10 Leads Created");

  }

  return (
    <div className="p-10 flex flex-col gap-4">

      <button
        className="bg-black text-white p-3"
        onClick={resetQuota}
      >
        Reset Quota
      </button>

      <button
        className="bg-black text-white p-3"
        onClick={testDuplicate}
      >
        Test Idempotency
      </button>

      <button
        className="bg-black text-white p-3"
        onClick={generateLeads}
      >
        Generate 10 Leads
      </button>

    </div>
  );

}
