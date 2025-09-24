from celery import shared_task
from .models import CareNote, Summary
import os, requests

OPENAI_KEY = os.environ.get("OPENAI_API_KEY")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4")  # pick model per your account

# @shared_task
# def generate_summary_task(note_id):
#     note = CareNote.objects.get(id=note_id)
#     prompt = f"Summarize the following caregiver note in a kind, concise way. Provide both English and Japanese.\n\nNote:\n{note.text}"
#     # call OpenAI
#     response = requests.post(
#         "https://api.openai.com/v1/chat/completions",
#         headers={
#             "Authorization": f"Bearer {OPENAI_KEY}",
#             "Content-Type": "application/json",
#         },
#         json={
#             "model": OPENAI_MODEL,
#             "messages": [
#                 {"role":"system","content":"You are a helpful assistant that creates empathetic summaries."},
#                 {"role":"user","content": prompt}
#             ],
#             "temperature": 0.2,
#             "max_tokens": 400
#         },
#         timeout=30
#     )
#     response.raise_for_status()
#     data = response.json()
#     summary_text = data['choices'][0]['message']['content'].strip()
#     # naive split: you may prefer structured response in JSON from LLM
#     # Save summary
#     Summary.objects.create(care_note=note, text_en=summary_text, generated=True)
