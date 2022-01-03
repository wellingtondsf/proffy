import React, { useState } from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";

import "./styles.css";

import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import { Form, Formik } from "formik";
import api from "../../services/api";
import { useHistory } from "react-router";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm = () => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const history = useHistory();

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  };

  const handleCreateClass = (values: any) => {
    api
      .post("/classes", {
        ...values,
        cost: Number(values.cost),
      })
      .then(() => {
        alert("Sucessful when registering ");

        history.push("/");
      })
      .catch(() => {
        alert("Fail when registering");
      });
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="It's amazing that you want to give classes"
        description="The first step is to complete this application form"
      />

      <main>
        <Formik
          initialValues={{
            name: "",
            avatar: "",
            whatsapp: "",
            bio: "",
            cost: "",
          }}
          onSubmit={(values) => handleCreateClass(values)}
        >
          <Form>
            <fieldset>
              <legend>Your information</legend>
              <Input name="name" label="Full name" />
              <Input name="avatar" label="Avatar" />
              <Input name="whatsapp" label="whatsapp" />
              <Textarea name="bio" label="Biograph" />
            </fieldset>

            <fieldset>
              <legend>About the class</legend>
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
              <Input name="cost" label="Cost of your class per hour" />
            </fieldset>

            <fieldset>
              <legend>
                Availability
                <button type="button" onClick={addNewScheduleItem}>
                  {" "}
                  + New day
                </button>
              </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div className="schedule-item" key={`scheduleItem.${index}`}>
                    <Select
                      name={`schedule.[${index}].week_day`}
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

                    <Input
                      name={`schedule.[${index}].from`}
                      label="From"
                      type="time"
                    />
                    <Input
                      name={`schedule.[${index}].to`}
                      label="To"
                      type="time"
                    />
                  </div>
                );
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Warning" />
                Fill all fields !
              </p>

              <button type="submit">Submit</button>
            </footer>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default TeacherForm;
