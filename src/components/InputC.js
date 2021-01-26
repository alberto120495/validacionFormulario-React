import React from "react";
import {
  Label,
  GrupoInput,
  Input,
  LeyendaError,
  IconoValidacion,
} from "../elements/Formularios";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function InputC({
  estado,
  setEstado,
  tipo,
  name,
  label,
  placeholder,
  leyendaError,
  expresionRegular,
  funcion,
}) {
  const onChange = (e) => {
    setEstado({ ...estado, campo: e.target.value });
  };

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(estado.campo)) {
        setEstado({ ...estado, valido: "true" });
      } else {
        setEstado({ ...estado, valido: "false" });
      }
    }
    if (funcion) {
      funcion();
    }
  };

  return (
    <div>
      <Label htmlFor={name} valido={estado.valido}>
        {label}
      </Label>
      <GrupoInput>
        <Input
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          type={tipo}
          placeholder={placeholder}
          id={name}
          valido={estado.valido}
        />

        <IconoValidacion
          icon={estado.valido === "true" ? faCheckCircle : faTimesCircle}
          valido={estado.valido}
        />
      </GrupoInput>
      <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
    </div>
  );
}

export default InputC;
