import React from "react";
import whatsAppIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

import "./styles.css";

export interface TeacherItemProps {
  avatar: string;
  bio: string;
  cost: string;
  name: string;
  subject: string;
  whatsapp: string;
  id: string
}

const TeacherItem = (props: TeacherItemProps) => {
  const { avatar, name, subject, bio, cost, whatsapp, id } = props;
  
  
  const createNewConnection = () => {
    api.post("/connections", {
      user_id: id
    });
  };

  return (
    <main>
      <article className="teacher-item">
        <header>
          <img src={avatar} alt={name} />
          <div>
            <strong>{name}</strong>
            <span>{subject}</span>
          </div>
        </header>

        <p>{bio}</p>

        <footer>
          <p>
            Cost/hour
            <strong>R${cost}</strong>
          </p>
          <a target="_blank" href={`https://wa.me/${whatsapp}`} rel="noreferrer" onClick={createNewConnection}>
            <img src={whatsAppIcon} alt="Whats app icon" />
            Get in touch
          </a>
        </footer>
      </article>
    </main>
  );
};

export default TeacherItem;
