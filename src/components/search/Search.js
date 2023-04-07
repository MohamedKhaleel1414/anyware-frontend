import React, { useState, useEffect } from "react";
import { axiosInstance1 } from "../config/axiosSearch";
import { axiosInstance2 } from "../config/axiosSave";
import { useFormik } from "formik";
import * as yup from "yup";

function Search() {
  const [phoneData, setPhoneData] = useState({});
  const [showTable, setShowTable] = useState(false);
  const searchFormik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: yup.object().shape({
      number: yup.string().required("Enter number"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axiosInstance1.get(`/validate?number=${values.number}`).then((res) => {
        setPhoneData(res.data);
        setShowTable(true);
      });
    },
  });
  useEffect(() => {
    if (phoneData !== {}) {
      axiosInstance2.post("/save", phoneData).then((res) => {
        console.log(res.data);
      });
    }
  }, [phoneData]);
  return (
    <>
      <form className="m-5 w-50 pb-5" onSubmit={searchFormik.handleSubmit}>
        <div className="mb-3">
          <div className="d-flex gap-5">
            <div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter phone number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="number"
                onBlur={searchFormik.handleBlur}
                onChange={searchFormik.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success align-self-end"
              style={{ height: "50%" }}
              disabled={!searchFormik.isValid && searchFormik.touched}
            >
              Search
            </button>
          </div>
          {searchFormik.errors.number && (
            <small className="bg-danger text-danger px-2 mt-4 rounded-2 bg-opacity-10">
              {searchFormik.errors.number}
            </small>
          )}
          <div id="emailHelp" className="form-text">
            Phone number you would like to validate. Ex: 14158586273
          </div>
        </div>
      </form>
      {showTable === true && (
        <table className="container table table-striped text-center ">
          <tbody>
            {Object.keys(phoneData).map((keyy) => {
              return (
                <tr key={keyy}>
                  <th scope="col">{keyy}</th>
                  <th scope="col">{phoneData[keyy].toString()}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Search;
