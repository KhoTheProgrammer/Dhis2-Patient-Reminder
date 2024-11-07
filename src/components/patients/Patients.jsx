import React from "react";
import "./Patients.css";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableCellHead,
} from "@dhis2/ui";

const data = [
  {
    firstName: "Onyekachukwu",
    lastName: "Kariuki",
    incidentDate: "02/06/2007",
    lastUpdated: "05/25/1972",
    age: 66,
    registeringUnit: "Jawi",
    assignedUser: "Sofie Hubert",
    status: "Incomplete",
  },
  {
    firstName: "Kwasi",
    lastName: "Okafor",
    incidentDate: "08/11/2010",
    lastUpdated: "02/26/1991",
    age: 38,
    registeringUnit: "Mokassie MCHP",
    assignedUser: "Dashonte Clarke",
    status: "Complete",
  },
  {
    firstName: "Siyabonga",
    lastName: "Abiodun",
    incidentDate: "07/21/1981",
    lastUpdated: "02/06/2007",
    age: 98,
    registeringUnit: "Bathurst MCHP",
    assignedUser: "Unassigned",
    status: "Incomplete",
  },
  {
    firstName: "Chiyembekezo",
    lastName: "Okeke",
    incidentDate: "01/23/1982",
    lastUpdated: "07/15/2003",
    age: 2,
    registeringUnit: "Mayolla MCHP",
    assignedUser: "Wan Gengxin",
    status: "Incomplete",
  },
  {
    firstName: "Mtendere",
    lastName: "Afolayan",
    incidentDate: "08/12/1994",
    lastUpdated: "05/12/1972",
    age: 37,
    registeringUnit: "Gbangadu MCHP",
    assignedUser: "Gvozden Boskovsky",
    status: "Complete",
  },
  {
    firstName: "Inyene",
    lastName: "Okonkwo",
    incidentDate: "04/01/1971",
    lastUpdated: "03/16/2000",
    age: 70,
    registeringUnit: "Kunike Barina",
    assignedUser: "Oscar de la Cavallería",
    status: "Complete",
  },
  {
    firstName: "Amaka",
    lastName: "Pretorius",
    incidentDate: "01/25/1996",
    lastUpdated: "09/15/1986",
    age: 32,
    registeringUnit: "Bargbo",
    assignedUser: "Alberto Raya",
    status: "Incomplete",
  },
  {
    firstName: "Meti",
    lastName: "Abiodun",
    incidentDate: "10/24/2010",
    lastUpdated: "07/26/1989",
    age: 8,
    registeringUnit: "Majihun MCHP",
    assignedUser: "Unassigned",
    status: "Complete",
  },
  {
    firstName: "Eshe",
    lastName: "Okeke",
    incidentDate: "01/31/1995",
    lastUpdated: "01/31/1995",
    age: 63,
    registeringUnit: "Mambiama CHP",
    assignedUser: "Shadrias Pearson",
    status: "Incomplete",
  },
  {
    firstName: "Obi",
    lastName: "Okafor",
    incidentDate: "06/07/1990",
    lastUpdated: "01/03/2006",
    age: 28,
    registeringUnit: "Dalakuru CHP",
    assignedUser: "Anatoliy Shcherbatykh",
    status: "Incomplete",
  },
];

const Patients = () => {
  const tableHeaders = [
    "First name",
    "Last name",
    "Date Enrolled",
    "Organisation unit",
    "Health Program",
    "Add Appointment",
  ];

  return (
    <div className="table">
      <Table>
        <TableHead className="tablehead">
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCellHead key={index}>{header}</TableCellHead>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((person, index) => (
            <TableRow key={index} className="tablerow">
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{person.incidentDate}</TableCell>
              <TableCell>{person.registeringUnit}</TableCell>
              <TableCell>{person.assignedUser}</TableCell>
              <TableCell>
                <Button className="button">Add</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Patients;