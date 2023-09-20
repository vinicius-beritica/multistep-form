import * as PropsForm from "../../types/formData";
import { api } from "../../service/api";
import * as Styled from "../../styles/formStep";
import { useState, useEffect } from "react";
import * as Button from "../../components/Button/Button.style.tsx";
import { StepForm } from "../StepForm/index.tsx";

interface DownloadData extends PropsForm.FormData {
  id: number;
}

interface PropsDown {
  data: DownloadData;
}

export const Download = ({ data }: PropsDown) => {
  const [url, setUrl] = useState("");
  const apiUrl = `https://profile-api-vyah.onrender.com/profiles/${data.id}/download`;

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await api.get(apiUrl, { responseType: "blob" });
        if (response.status === 200) {
          const pdfBlob = new Blob([response.data], {
            type: "application/pdf",
          });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setUrl(pdfUrl);
        }
      } catch (error) {
        console.log("Erro ao gerar o download");
      }
    };

    fetchPdf();
  }, []);

  return (
    <Styled.Field>
      {url && (
        <StepForm title="Cadastro realizado.">
          <p>{apiUrl}</p>
          <br />
          <Button.ContainerButton>
            <Styled.Plus>
              <a className="a-download" href={url} download="profile.pdf">
                Clique aqui para baixar
              </a>
            </Styled.Plus>
          </Button.ContainerButton>
        </StepForm>
      )}
    </Styled.Field>
  );
};
