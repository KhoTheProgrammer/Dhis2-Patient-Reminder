import React, { useEffect, useState } from "react";
import "./Patients.css";
import { patientsQuery } from "./api";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableCellHead,
} from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";

const Patients = () => {
  const tableHeaders = ["First name", "Last name", 'Add Appointment'];

  const [patients, setPatients] = useState([]);
  const { loading, error, data } = useDataQuery(patientsQuery);

  useEffect(() => {
    if (data) {
      const patientsData = data.trackedEntityInstances.trackedEntityInstances.map((instance) => {
        const attributes = instance.attributes;

        const getAttributeValue = (name) => {
          const attribute = attributes.find((attr) => attr.displayName === name);
          return attribute ? attribute.value : "";
        };

        return {
          id: instance.trackedEntityInstance,
          firstName: getAttributeValue("First name"),
          lastName: getAttributeValue("Last name"),
        };
      });

      setPatients(patientsData);
    }
  }, [data]);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  const handleAddAppointment = (patientId) => {
    console.log(`Add appointment for patient ${patientId}`);
  };

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
          {patients.map((person, index) => (
            <TableRow key={index} className="tablerow">
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>
                <Button className="button" onClick={() => handleAddAppointment(person.id)}>Add</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Patients;