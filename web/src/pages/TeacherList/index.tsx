import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import TeacherItem, { TeacherItemProps } from "../../components/TeacherItem";

import searchIcon from "../../assets/images/icons/search.svg";

import "./styles.css";
import api from "../../services/api";

const TeacherList = () => {
  const [teachers, setTeachers] = useState<TeacherItemProps[]>([]);

  const searchTeachers = async (values: any) => {
    const response = await api.get("/classes", {
      params: { ...values },
    });

    setTeachers(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the profys available.">
        <Formik
          initialValues={{ time: "00:00" }}
          onSubmit={(values) => searchTeachers(values)}
        >
          <Form id="search-teachers">
            <Select
              name="subject"
              label="Subject"
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Biology", label: "Biology" },
                { value: "Science", label: "Science" },
                { value: "History", label: "History" },
                { value: "English", label: "English" },
                { value: "Geograph", label: "Geograph" },
                { value: "Phisics", label: "Phisics" },
              ]}
            />
            <Select
              name="week_day"
              label="Week day"
              options={[
                { value: "0", label: "Sunday" },
                { value: "1", label: "Monday" },
                { value: "2", label: "Tuesday" },
                { value: "3", label: "Wednesday" },
                { value: "4", label: "Thursday" },
                { value: "5", label: "Friday" },
                { value: "6", label: "Saturday" },
              ]}
            />
            <Input name="time" label="Time" type="time" />
            <button type="submit">
              <img src={searchIcon} alt="Search" />
            </button>
          </Form>
        </Formik>
      </PageHeader>

      {teachers.map((teacher, index) => (
        <TeacherItem {...teacher} key={`teacher${index}`} />
      ))}
    </div>
  );
};

export default TeacherList;
