#!/usr/bin/env python3
"""Genereert overzicht.xlsx uit companies.json. Draait automatisch als onderdeel
van de nachtelijke demo-site pipeline, telkens als companies.json wijzigt."""

import json
import sys
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table, TableStyleInfo

ROOT = Path(__file__).resolve().parent.parent
COMPANIES_JSON = ROOT / "companies.json"
OUTPUT_XLSX = ROOT / "overzicht.xlsx"

FONT_NAME = "Arial"
HEADER_FILL = PatternFill(start_color="1F2937", end_color="1F2937", fill_type="solid")
HEADER_FONT = Font(name=FONT_NAME, bold=True, color="FFFFFF", size=11)
BODY_FONT = Font(name=FONT_NAME, size=10)
THIN = Side(style="thin", color="D1D5DB")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

STATUS_FILLS = {
    "done": PatternFill(start_color="D1FAE5", end_color="D1FAE5", fill_type="solid"),
    "in_progress": PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid"),
    "needs_review": PatternFill(start_color="FEE2E2", end_color="FEE2E2", fill_type="solid"),
    "pending": PatternFill(start_color="E5E7EB", end_color="E5E7EB", fill_type="solid"),
}

COLUMNS = [
    ("Bedrijfsnaam", 26),
    ("Contactpersoon", 22),
    ("Branche", 30),
    ("Regio", 24),
    ("Status", 14),
    ("Repo", 22),
    ("Live URL", 42),
    ("Pitchmail klaar", 14),
    ("Telefoon", 16),
    ("E-mail", 26),
    ("Toegevoegd op", 14),
    ("Afgerond op", 14),
]


def load_companies():
    data = json.loads(COMPANIES_JSON.read_text(encoding="utf-8"))
    return data["companies"]


def build_workbook(companies):
    wb = Workbook()
    ws = wb.active
    ws.title = "Overzicht"

    for col_idx, (header, width) in enumerate(COLUMNS, start=1):
        cell = ws.cell(row=1, column=col_idx, value=header)
        cell.font = HEADER_FONT
        cell.fill = HEADER_FILL
        cell.alignment = Alignment(horizontal="left", vertical="center")
        cell.border = BORDER
        ws.column_dimensions[get_column_letter(col_idx)].width = width

    ws.freeze_panes = "A2"

    for row_idx, c in enumerate(companies, start=2):
        contact = c.get("contact", {})
        values = [
            c.get("bedrijfsnaam", ""),
            c.get("contactpersoon", ""),
            c.get("branche", ""),
            c.get("regio", ""),
            c.get("status", ""),
            c.get("repo", ""),
            c.get("live_url") or "",
            "Ja" if c.get("pitch_email_klaar") else "Nee",
            contact.get("telefoon", ""),
            contact.get("email", ""),
            c.get("toegevoegd_op", ""),
            c.get("afgerond_op") or "",
        ]
        status_fill = STATUS_FILLS.get(c.get("status"), None)
        for col_idx, value in enumerate(values, start=1):
            cell = ws.cell(row=row_idx, column=col_idx, value=value)
            cell.font = BODY_FONT
            cell.border = BORDER
            cell.alignment = Alignment(horizontal="left", vertical="center")
            if col_idx == 5 and status_fill:
                cell.fill = status_fill

    last_row = max(len(companies) + 1, 2)
    last_col_letter = get_column_letter(len(COLUMNS))
    if len(companies) > 0:
        table = Table(displayName="BedrijvenOverzicht", ref=f"A1:{last_col_letter}{last_row}")
        table.tableStyleInfo = TableStyleInfo(
            name="TableStyleMedium2", showRowStripes=True, showFirstColumn=False
        )
        ws.add_table(table)

    wb.save(OUTPUT_XLSX)
    return OUTPUT_XLSX


def main():
    companies = load_companies()
    path = build_workbook(companies)
    print(f"overzicht.xlsx geschreven met {len(companies)} bedrijven -> {path}")


if __name__ == "__main__":
    sys.exit(main())
