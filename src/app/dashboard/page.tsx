"use client";

import { useEffect, useState } from "react";

export default function Page() {

  const [providers, setProviders] =
    useState<any[]>([]);

  async function fetchData() {

    const response =
      await fetch("/api/dashboard");

    const data =
      await response.json();

    setProviders(data);

  }

  useEffect(() => {

    fetchData();

    const interval =
      setInterval(fetchData, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="p-10">

      <h1 className="text-2xl mb-5">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-5">

        {providers.map((provider) => (

          <div
            key={provider.id}
            className="border p-5"
          >

            <h2 className="font-bold">
              {provider.name}
            </h2>

            <p>
              Leads:
              {" "}
              {provider.assignments.length}
            </p>

            <p>
              Remaining:
              {" "}
              {10 -
                provider.assignments.length}
            </p>

            {provider.assignments.map(
              (a: any) => (

                <div key={a.id}>
                  {a.lead.name}
                </div>

              )
            )}

          </div>

        ))}

      </div>

    </div>
  );

}
