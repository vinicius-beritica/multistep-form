import { useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { StepForm } from "../StepForm";
import * as Styled from "../../styles/formStep";
import * as Button from "../../components/Button/Button.style.tsx";
import { api } from "../../service/api";
import * as PropsForm from "../../types/formData";
import { PiPlus } from "react-icons/pi";

interface Option {
  id: number;
  name: string;
  role: string;
}
interface PropsStepOne {
  next: (e: PropsForm.FormData) => void;
  data: PropsForm.FormData;
}

const stepOneValidation = Yup.object().shape({
  name: Yup.string()
    .min(4, "* Nome deve ter no minimo 4 carcacteres")
    .required("* Nome é um campo obrigatorio"),
  email: Yup.string()
    .email()
    .min(4, "* Nome deve ter no minimo 4 carcacteres")
    .required("* Nome é um campo obrigatorio"),
  birthdate: Yup.string().required("Data de nascimento é um campo obrigatório"),
  phone: Yup.string()
    .matches(/^\d{11}$/, "* Telefone deve ter exatamente 11 dígitos")
    .required("* Telefone é um campo obrigatório"),
  bio: Yup.string()
    .min(50, "* Biografia deve ter no mínimo 50 caracteres")
    .required("* Biografia é um campo obrigatório"),
  links: Yup.array()
    .of(Yup.string().url("* Por favor, insira uma URL válida"))
    .notRequired(),

  state: Yup.string().required("* Estado é um campo obrigatório"),
  city: Yup.string().required("* Cidade é um campo obrigatório"),
});

export const FormStepOne = ({ next, data }: PropsStepOne) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState("");

  const handleSubmit = (values: PropsForm.FormData) => {
    next(values);
  };

  ///////////////// Estado
  useEffect(() => {
    api
      .get("/states")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API", error);
      });
  }, []);

  /////////////////////// Ciadade
  useEffect(() => {
    if (selectedState) {
      api
        .get(`/states/${selectedState}`)
        .then((response) => {
          setCities(response.data.cities);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados da API", error);
        });
    }
  }, [selectedState]);

  return (
    <StepForm title="Dados Pessoais">
      <Formik<PropsForm.FormData>
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={stepOneValidation}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          isValid,
        }) => (
          <Styled.FormContainer>
            <Form>
              <Styled.Field>
                <label htmlFor="name">Nome: </label>
                <Field
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome"
                  errors={touched.name && errors.name}
                />
                {touched.name && errors.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="email">Email: </label>
                <Field
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Digite seu nome"
                  errors={touched.email && errors.email}
                />
                {touched.email && errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="birthdate">Data de nascimento: </label>
                <Field
                  className="input"
                  type="date"
                  name="birthdate"
                  placeholder="Digite data de nascimento"
                  errors={touched.birthdate && errors.birthdate}
                />
                {touched.birthdate && errors.birthdate ? (
                  <div className="error">{errors.birthdate}</div>
                ) : null}
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="phone">Telefone: </label>
                <Field
                  className="input"
                  type="text"
                  name="phone"
                  placeholder="Digite seu telefone"
                  errors={touched.phone && errors.phone}
                />
                {touched.phone && errors.phone ? (
                  <div className="error">{errors.phone}</div>
                ) : null}
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="bio">Biografia: </label>
                <Field
                  className="text-area"
                  as="textarea"
                  rows="10"
                  cols="10"
                  name="bio"
                  placeholder="Digite sua biografia"
                />
                {touched.bio && errors.bio ? (
                  <div className="error">{errors.bio}</div>
                ) : null}
              </Styled.Field>

              <FieldArray
                name="links"
                render={(arrayHelpers) => (
                  <div>
                    <label htmlFor="links">Links: </label>
                    {values.links &&
                      values.links.map((item, index) => (
                        <div key={index}>
                          <Styled.InputLink>
                            <Field
                              className="input"
                              type="text"
                              name={`links[${index}]`}
                              placeholder="Digite um link"
                            />
                            {touched.links &&
                            touched.links[index] &&
                            errors.links &&
                            errors.links[index] ? (
                              <div className="error">{errors.links[index]}</div>
                            ) : null}
                            <Styled.Sub
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </Styled.Sub>
                          </Styled.InputLink>
                        </div>
                      ))}
                    <Styled.Plus
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      <PiPlus />
                    </Styled.Plus>
                  </div>
                )}
              />
              <br />

              <Styled.Field>
                <label htmlFor="state">Estado: </label>
                <Field
                  className="select"
                  as="select"
                  name="state"
                  onChange={(e) => {
                    setFieldValue("state", e.target.value);
                    setSelectedState(e.target.value);
                  }}
                >
                  <option value="">Selecione o Estado</option>
                  {options.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Field>
                {touched.state && errors.state ? (
                  <div className="error">{errors.state}</div>
                ) : null}
              </Styled.Field>

              <Styled.Field>
                <label htmlFor="city">Cidade: </label>
                <Field as="select" name="city" disabled={!selectedState}>
                  <option value="">Selecione a cidade</option>
                  {Array.isArray(cities) &&
                    cities.map((city, index) => (
                      <option key={index} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                </Field>
                {touched.city && errors.city ? (
                  <div className="error">{errors.city}</div>
                ) : null}
              </Styled.Field>
              <Button.ContainerButton>
                <Button.ButtonAction
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !isValid ||
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
