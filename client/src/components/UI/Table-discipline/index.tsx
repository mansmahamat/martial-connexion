import React from 'react';

type Discipline = {
  discipline: Discipline[];
};

function TableDiscipline({ prices, accountId, userEmail, customerId, userName }: any) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-red-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discipline
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prices.map((person: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {person.discipline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.price} €
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <form
                        action={`https://martial-connexion.herokuapp.com/api/create-payment-products`}
                        method="POST">
                        <input
                          type="hidden"
                          id="pricesId"
                          name="pricesId"
                          value={person.pricesId}
                        />

                        <input type="hidden" id="price" name="price" value={person.price} />
                        <input type="hidden" id="userEmail" name="userEmail" value={userEmail} />
                        <input type="hidden" id="accountId" name="accountId" value={accountId} />
                        <input type="hidden" id="userName" name="userName" value={userName} />
                        <input type="hidden" id="customerId" name="customerId" value={customerId} />
                        <button
                          className="text-red-500 font-bold"
                          id="checkout-and-portal-button"
                          type="submit">
                          Payer ma licence
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableDiscipline;
