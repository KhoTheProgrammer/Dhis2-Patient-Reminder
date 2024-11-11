import React, { useState, useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { useRegisterPatient } from "./Api";
import {
    InputField,
    Button,
    ButtonStrip,
    SingleSelectField,
    SingleSelectOption,
    Radio,
    FieldSet,
    CircularLoader,
    NoticeBox
} from "@dhis2/ui";
import "./Register.css";

const orgUnitQuery = {
    organisationUnits: {
        resource: "organisationUnits.json",
        params: {
            level: 2,
            fields: "id,name",
            paging: false,
        },
    },
};

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        phone: "",
        address: "",
        orgUnit: "",
    });

    const [orgUnits, setOrgUnits] = useState([]);
    const { loading: orgLoading, error: orgError, data: orgData } = useDataQuery(orgUnitQuery);
    const { registerPatient, loading: regLoading, error: regError } = useRegisterPatient();

    useEffect(() => {
        if (orgData?.organisationUnits?.organisationUnits) {
            setOrgUnits(orgData.organisationUnits.organisationUnits);
        }
    }, [orgData]);

    const handleChange = (e) => {
        const { name, value } = e?.target || {};
        if (name) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSelectChange = ({ selected }) => {
        setFormData((prevData) => ({
            ...prevData,
            orgUnit: selected,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerPatient(formData);
        } catch (error) {
            alert("Error registering patient");
        }
    };

    if (orgLoading) return <CircularLoader />;
    if (orgError) return <NoticeBox title="Error" error>{orgError.message}</NoticeBox>;

    return (
        <div className="register-form">
            <h2>Register Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <InputField
                        name="firstName"
                        label="First Name"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        inputWidth="400px"
                    />
                    <InputField
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        inputWidth="400px"
                    />
                </div>
                <div className="form-row">
                    <InputField
                        name="dob"
                        label="Date of Birth"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    <FieldSet legend="Gender" required className="form-row">
                        <Radio
                            label="Male"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                        />
                        <Radio
                            label="Female"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                        />
                    </FieldSet>
                </div>
                <div className="form-row">
                    <InputField
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter phone number"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        name="address"
                        label="Address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange}
                        inputWidth="400px"
                    />
                </div>
                <SingleSelectField
                    label="Organization Unit"
                    selected={formData.orgUnit}
                    onChange={handleSelectChange}
                    required
                >
                    {orgUnits.map((unit) => (
                        <SingleSelectOption key={unit.id} value={unit.id} label={unit.name} />
                    ))}
                </SingleSelectField>
                <ButtonStrip>
                    <Button primary type="submit" loading={regLoading}>
                        {regLoading ? "Registering..." : "Register"}
                    </Button>
                    <Button secondary type="reset">
                        Cancel
                    </Button>
                </ButtonStrip>
                {regError && <NoticeBox title="Registration Error" error>{regError.message}</NoticeBox>}
            </form>
        </div>
    );
};

export default Register;
