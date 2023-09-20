import { StepForm } from "../StepForm";
import * as Styled from "../../styles/formStep.ts";
import { api } from "../../service/api";
import { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import * as PropsForm from "../../types/formData";
import * as Button from "../../components/Button/Button.style.tsx";

interface Option {
  id: number;
  name: string;
  role: string;
}

const stepTwoValidation = Yup.object().shape({
  tech: Yup.string().required("Selecionar uma tecnologia"),
  abilities: Yup.array().required("Competências é obrigatório"),
  softskills: Yup.array().required("Softskills é obrigatório"),
});

interface PropsStepTwo {
  next: (e: PropsForm.FormData) => void;
  prev: (e: PropsForm.FormData) => void;
  data: PropsForm.FormData;
}
export const FormStepTwo = ({ next, prev, data }: PropsStepTwo) => {
  const [role, setRole] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [optionsTechs, setOptionsTechs] = useState<Option[]>([]);
  const [abilities, setAbilities] = useState<Option[]>([]);
  const [softskills, setSoftskills] = useState<Option[]>([]);
  const softskillOptions = softskills.map((softskill) => ({
    value: softskill.id,
    label: softskill.name,
  }));
  const abilitiesOptions = abilities.map((ability) => ({
    value: ability.id,
    label: ability.name,
  }));

  //////////////////////  Tecnologia  //////////////////////////////
  useEffect(() => {
    api
      .get("/techs")
      .then((response) => {
        setOptionsTechs(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API", error);
      });
  }, []);

  //////////////////////  Abilities  //////////////////////////////
  useEffect(() => {
    if (role) {
      api.get(`/abilities?role=${role}`).then((response) => {
        const data = response.data;
        Array.isArray(data) ? setAbilities(data) : setAbilities([]);
      });
    }
  }, [role]);

  // Buscar softskills da API quando o componente é montado
  useEffect(() => {
    api
      .get("/softskills")
      .then((response) => {
        setSoftskills(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API", error);
      });
  }, []);

  const handleSubmit = (values: PropsForm.FormData) => {
    next(values);
  };

  //Quando o papel é selecionado, habilite o campo "Tecnologia/Stack"
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  // Quando a tecnologia/stack é selecionada, habilite o campo "Competências"
  const handleTechChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTech(e.target.value);
  };

  return (
    <StepForm title="Dados Técnicos">
      <Formik<PropsForm.FormData>
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={stepTwoValidation}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          isValid,
        }) => (
          <Styled.FormContainer>
            <Form>
              <Styled.Field>
                <label htmlFor="role">Papel: </label>
                <Field name="role">
                  {({ field, form }) => {
                    const options = [
                      { value: "frontend", label: "Frontend" },
                      { value: "backend", label: "Backend" },
                      { value: "Fullstack", label: "Fullstack" },
                      { value: "Mobile", label: "Mobile" },
                      { value: "Designer", label: "Designer" },
                      { value: "QA", label: "QA" },
                    ];
                    const selectedOption = options.find(
                      (option) => option.value === form.values.role
                    );
                    return (
                      <Select
                        options={options}
                        value={selectedOption}
                        onChange={(option) => {
                          form.setFieldValue(
                            "role",
                            option ? option.value : ""
                          );
                          setRole(option ? option.value : "");
                          handleRoleChange;
                        }}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage name="role" />
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="tech">Tecnologia/Stack: </label>
                <Field name="tech">
                  {({ field, form }) => {
                    const options = optionsTechs.map((option) => ({
                      value: option.id,
                      label: option.name,
                    }));
                    const selectedOption = options.find(
                      (option) => option.value === form.values.tech
                    );
                    return (
                      <Select
                        options={options}
                        isDisabled={!role}
                        value={selectedOption}
                        onChange={(option) => {
                          form.setFieldValue(
                            "tech",
                            option ? option.value : ""
                          );
                          setSelectedTech(option ? option.value : "");
                          handleTechChange;
                        }}
                      />
                    );
                  }}
                </Field>
                <ErrorMessage name="tech" />
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="abilities">Competências: </label>
                <Field name="abilities">
                  {({ field, form }) => (
                    <Select
                      isMulti
                      name="abilities"
                      options={abilitiesOptions}
                      className="basic-multi-select"
                      value={form.values.abilities}
                      classNamePrefix="select"
                      isDisabled={!role || !selectedTech}
                      onChange={(option) => {
                        form.setFieldValue("abilities", option || []);
                        form.setFieldTouched("abilities", true);
                      }}
                    />
                  )}
                </Field>
                {touched.abilities && errors.abilities && (
                  <div>{errors.abilities}</div>
                )}
              </Styled.Field>
              <Styled.Field>
                <label htmlFor="softskills">Softskills: </label>
                <Field name="softskills">
                  {({ field, form }) => (
                    <Select
                      isMulti
                      name="softskills"
                      options={softskillOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isDisabled={!role || !selectedTech || !abilities}
                      value={form.values.softskills}
                      onChange={(option) => {
                        if (option && option.length > 3) {
                          alert("Você só pode selecionar 3 softskills");
                        } else {
                          form.setFieldValue("softskills", option || []);
                        }
                      }}
                    />
                  )}
                </Field>
                {touched.softskills && errors.softskills && (
                  <div>{errors.softskills}</div>
                )}
              </Styled.Field>
              <Button.ContainerButton>
                <Button.ButtonBackAction
                  type="button"
                  onClick={() => prev(values)}
                >
                  Voltar
                </Button.ButtonBackAction>
                <Button.ButtonAction
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !(values.abilities && values.abilities.length > 0) ||
                    !(values.softskills && values.softskills.length > 0) ||
                    JSON.stringify(data) === JSON.stringify(values)
                  }
                >
                  Próximo
                </Button.ButtonAction>
              </Button.ContainerButton>
            </Form>
          </Styled.FormContainer>
        )}
      </Formik>
    </StepForm>
  );
};
