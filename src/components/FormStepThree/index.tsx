import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StepForm } from "../StepForm";
import * as Styled from "../../styles/formStep.ts";
import { api } from "../../service/api";
import * as PropsForm from "../../types/formData";
import * as Button from "../../components/Button/Button.style.tsx";

interface PropsStepTree {
  next: (e: PropsForm.FormData) => void;
  prev: (e: PropsForm.FormData) => void;
  data: PropsForm.FormData;
}
export const FormStepThree = ({ next, prev, data }: PropsStepTree) => {
  const handleSubmit = async (values: PropsForm.FormData) => {
    try {
      const response = await api.post("/profiles", {
        profile: {
          name: values.name,
          email: values.email,
          birthdate: values.birthdate,
          phone: values.phone,
          role: values.role,
          bio: values.bio,
          links: values.links,
          city_id: values.city,
          experiences_attributes: values.experiences.map(
            (experience, index) => ({
              title: experience.title,
              company_name: experience.company_name,
              function_performed: experience.function_performed,
              start_date: experience.start_date,
              end_date: experience.end_date,
            })
          ),
          studies_attributes: values.experience_educational.map(
            (educational, index) => ({
              title: educational.title_academy,
              institution: educational.institution,
              link: educational.link,
              start_date: educational.start_date_academy,
              end_date: educational.end_date_academy,
            })
          ),
          ability_ids: values.abilities.map((ability) => ability.value),
          softskill_ids: values.softskills.map((softskill) => softskill.value),
          tech_ids: [Number(values.tech)],
        },
      });
      if (response.status === 201) {
        next(response.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        alert(
          "Os campos abaixo precisam ser preenchidos: " +
            JSON.stringify(error.response.data, null, 2)
        );
      } else {
        console.log("Erro ao fazer a requisição:", error);
      }
    }
  };

  const stepTreeValidation = Yup.object().shape({
    experience: Yup.string().oneOf(
      ["sim", "não"],
      "Você deve selecionar uma opção"
    ),
    experience_educational: Yup.array().of(
      Yup.object({
        institution: Yup.string()
          .required("O nome da empresa é obrigatório")
          .min(4, "Deve conter"),
        start_date_academy: Yup.date()
          .required("A data de início é obrigatória")
          .max(new Date(), "A data de início não pode ser no futuro"),
        end_date_academy: Yup.date().min(
          Yup.ref("start_date_academy"),
          "A data de fim não pode ser antes da data de início"
        ),
        title_academy: Yup.string().required("O cargo é obrigatório"),
      })
    ),
  });

  return (
    <StepForm title="Experiências">
      <Formik<PropsForm.FormData>
        initialValues={data}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validationSchema={stepTreeValidation}
      >
        {({ errors, touched, isSubmitting, values, isValid }) => (
          <Styled.FormContainer>
            <Form>
              <Styled.Field>
                <label htmlFor="experiences">
                  Você possui experiência profissional?
                </label>
                <div role="group" aria-labelledby="experiences">
                  <label>
                    <Field type="radio" name="experience" value="sim" />
                    Sim
                  </label>
                  <label>
                    <Field type="radio" name="experience" value="não" />
                    Não
                  </label>
                </div>
                {touched.experience && errors.experience ? (
                  <div>{errors.experience}</div>
                ) : null}
              </Styled.Field>
              {values.experience === "sim" ? (
                <div>
                  <FieldArray
                    name="experiences"
                    render={(arrayHelpers) => (
                      <div>
                        {values.experiences &&
                          values.experiences.map((experiences, index) => (
                            <div className="step-3-form" key={index}>
                              <Styled.Field>
                                <br />
                                <label htmlFor="company_name">
                                  Nome da empresa:
                                </label>

                                <Field
                                  className="input"
                                  type="text"
                                  id="company_name"
                                  name={`experiences[${index}].company_name`}
                                />
                                <ErrorMessage
                                  name={`experiences[${index}].company_name`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <br />
                                <label htmlFor="start_date">
                                  Data de início:
                                </label>
                                <Field
                                  className="input"
                                  type="date"
                                  id="start_date"
                                  name={`experiences[${index}].start_date`}
                                />
                                <ErrorMessage
                                  name={`experiences[${index}].start_date`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <br />
                                <label htmlFor="end_date">
                                  Data de fim (opcional):
                                </label>
                                <Field
                                  className="input"
                                  type="date"
                                  id="end_date"
                                  name={`experiences[${index}].end_date`}
                                />
                                <ErrorMessage
                                  name={`experiences[${index}].end_date`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <br />
                                <label htmlFor="title">Cargo:</label>
                                <Field
                                  className="input"
                                  type="text"
                                  id="title"
                                  name={`experiences[${index}].title`}
                                />
                                <ErrorMessage
                                  name={`experiences[${index}].title`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <br />
                                <label htmlFor="function_performed">
                                  Função:
                                </label>
                                <Field
                                  className="input"
                                  as="textarea"
                                  id="function_performed"
                                  name={`experiences[${index}].function_performed`}
                                />
                                <ErrorMessage
                                  name={`experiences[${index}].function_performed`}
                                />
                              </Styled.Field>

                              <Styled.SubStep3
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </Styled.SubStep3>
                            </div>
                          ))}
                        <Styled.Plus
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              id: 0,
                              title: "",
                              company_name: "",
                              start_date: "",
                              end_date: "",
                              function_performed: "",
                            })
                          }
                        >
                          +
                        </Styled.Plus>
                      </div>
                    )}
                  />
                </div>
              ) : null}
              <br />
              <br />
              <h3>Experiência Educacional</h3>

              <FieldArray
                name="experience_educational"
                render={(arrayHelpers) => (
                  <div>
                    {values.experience_educational &&
                      values.experience_educational.map(
                        (experience_educational, index) => (
                          <div className="step-3-form" key={index}>
                            <Styled.Field>
                              <br />
                              <label htmlFor="institution">Instituição:</label>
                              <Field
                                className="input"
                                type="text"
                                id="institution"
                                name={`experience_educational[${index}].institution`}
                              />
                              <ErrorMessage
                                name={`experience_educational[${index}].institution`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <br />
                              <label htmlFor="title_academy">Curso: </label>
                              <Field
                                className="input"
                                type="text"
                                id="title_academy"
                                name={`experience_educational[${index}].title_academy`}
                              />
                              <ErrorMessage
                                name={`experience_educational[${index}].title_academy`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <br />
                              <label htmlFor="start_date_academy">
                                Data de início (opcional):
                              </label>
                              <Field
                                className="input"
                                type="date"
                                id="start_date_academy"
                                name={`experience_educational[${index}].start_date_academy`}
                              />
                              <ErrorMessage
                                name={`experience_educational[${index}].start_date_academy`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <br />
                              <label htmlFor="end_date_academy">
                                Data de fim (opcional):
                              </label>
                              <Field
                                className="input"
                                type="date"
                                id="end_date_academy"
                                name={`experience_educational[${index}].end_date_academy`}
                              />
                              <ErrorMessage
                                name={`experience_educational[${index}].end_date_academy`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <br />
                              <label htmlFor="link">Link (opcional):</label>
                              <Field
                                className="input"
                                type="url"
                                id="link"
                                name={`experience_educational[${index}].link`}
                              />
                            </Styled.Field>
                            <Styled.SubStep3
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </Styled.SubStep3>
                          </div>
                        )
                      )}
                    <Styled.Plus
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          id: 0,
                          title_academy: "",
                          institution: "",
                          link: "",
                          start_date_academy: "",
                          end_date_academy: "",
                        })
                      }
                    >
                      +
                    </Styled.Plus>
                  </div>
                )}
              />
              <Button.ContainerButton>
                <Button.ButtonBackAction
                  type="button"
                  onClick={() => prev(values)}
                >
                  Anterior
                </Button.ButtonBackAction>
                <Button.ButtonAction
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !isValid ||
                    JSON.stringify(data) === JSON.stringify(values)
                  }
                >
                  Enviar
                </Button.ButtonAction>
              </Button.ContainerButton>
            </Form>
          </Styled.FormContainer>
        )}
      </Formik>
    </StepForm>
  );
};
