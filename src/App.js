import React, { useState } from "react";
import "./style.css";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBoton,
  Boton,
  MensajeExito,
  MensajeError,
} from "./elements/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import InputC from "./components/InputC";

export default function App() {
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [password, setPassword] = useState({ campo: "", valido: null });
  const [password2, setPassword2] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [terminos, setTerminos] = useState(false);
  const [FormValido, setFormValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const validadPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        setPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };

  const onChangeTerminos = (e) => {
    setTerminos(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      setFormValido(true);
      setUsuario({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setPassword({ campo: "", valido: null });
      setPassword2({ campo: "", valido: null });
      setCorreo({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setTerminos(false);
    } else {
      setFormValido(false);
    }
  };

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <InputC
          estado={usuario}
          setEstado={setUsuario}
          tipo="text"
          name="usuario"
          label="Usuario"
          placeholder="APimentel04"
          leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
          expresionRegular={expresiones.usuario}
        />

        <InputC
          estado={nombre}
          setEstado={setNombre}
          tipo="text"
          name="nombre"
          label="Nombre"
          placeholder="Alberto Pimentel"
          leyendaError="El nombre solo puede contener letras y espacios."
          expresionRegular={expresiones.nombre}
        />

        <InputC
          estado={correo}
          setEstado={setCorreo}
          tipo="email"
          name="correo"
          label="Correo"
          placeholder="apimentel@gmail.com"
          leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo"
          expresionRegular={expresiones.correo}
        />

        <InputC
          estado={password}
          setEstado={setPassword}
          tipo="password"
          name="password1"
          label="Contraseña"
          leyendaError="La contraseña tiene que ser de 4 a 12 digitos"
          expresionRegular={expresiones.password}
        />

        <InputC
          estado={password2}
          setEstado={setPassword2}
          tipo="password"
          name="password2"
          label="Repetir contraseña"
          leyendaError="Ambas contraseñas deben ser iguales"
          funcion={validadPassword2}
        />

        <InputC
          estado={telefono}
          setEstado={setTelefono}
          tipo="text"
          name="password1"
          label="Telefono"
          placeholder="5510485555"
          leyendaError="El telefono solo puede contener numeros y el maximo son 14 digitos"
          expresionRegular={expresiones.password}
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
            />
            Acepto los Terminos y Condiciones
          </Label>
        </ContenedorTerminos>

        {FormValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b>Por favor rellena el formulario correctamente
            </p>
          </MensajeError>
        )}

        <ContenedorBoton>
          <Boton type="submit">Enviar</Boton>
          <MensajeExito>Formulario enviado correctamente</MensajeExito>
        </ContenedorBoton>
      </Formulario>
    </main>
  );
}
