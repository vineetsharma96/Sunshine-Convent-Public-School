"""Download and inspect public school evidence; does not modify supplied Information.txt."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import importlib.util
import urllib.request

ROOT = Path(__file__).resolve().parents[1] / 'verification' / 'sources'
ROOT.mkdir(parents=True, exist_ok=True)
FILES = ['GENERAL-INFO.pdf', 'Mandatory-Disclosure.pdf', 'LAST3YEAR-RESULT.pdf', 'LandCertificate.pdf', 'AffilationLetter.pdf']

def retrieve(name):
    path = ROOT / name
    try:
        request = urllib.request.Request('http://www.scpsweb.com/docs/' + name, headers={'User-Agent': 'Mozilla/5.0'})
        path.write_bytes(urllib.request.urlopen(request, timeout=40).read())
        if importlib.util.find_spec('fitz'):
            import fitz
            doc = fitz.open(path)
            text = '\n'.join(page.get_text() for page in doc)
            for index, page in enumerate(doc):
                page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(str(ROOT / f'{path.stem}-{index+1}.png'))
        else:
            from pypdf import PdfReader
            doc = PdfReader(path)
            text = '\n'.join(page.extract_text() or '' for page in doc.pages)
        path.with_suffix('.txt').write_text(text, encoding='utf-8')
        return name + ': ' + text[:12000]
    except Exception as error:
        return name + ': ' + str(error)

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=5) as pool:
        for result in pool.map(retrieve, FILES):
            print(result)
