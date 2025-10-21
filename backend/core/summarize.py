from dotenv import load_dotenv
import os

from openai import OpenAI
from pydantic import BaseModel

# Set your OpenAI API key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class summary(BaseModel):
    en: str
    jp: str

def summarize_text(text, model="gpt-4o-mini"):
    response = client.responses.parse(
        model=model,
        input=[
            {"role": "system", "content": """
                Summarize the caregiver’s note into a short, clear summary for the patient’s family.
                Note: Be empathetic and concise.
                Provide output in both Japanese and English
                """
            },
            {"role": "user", "content": text}
        ],
        text_format=summary,
        max_output_tokens=500,
    )
    # print(response)
    return response.output_text

# Example usage:
if __name__ == "__main__":
    sample_note = "Tanaka-san ate only half lunch, seemed tired, forgot medication."
    summary = summarize_text(sample_note)
    print("Summary:", summary)