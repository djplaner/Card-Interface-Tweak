# update.py
# - authoritative source for all docs (save index.md) are Word documents
# - Convert the Word docs to Markdown and update the repository
# 
# STATUS
# - hard-coded for a specific box

import mammoth
import html2markdown
from pathlib import Path
import os

DESTINATION=r"\\staff.ad.griffith.edu.au\ud\fr\s2986288\Documents\GitHub\Card-Interface-Tweak\docs"
#DESTINATION="\\staff.ad.griffith.edu.au\ud\fr\s2986288\Documents\GitHub\Card-Interface-Tweak\docs"

print( os.name)
print(Path.home())
SOURCE=r"C:\\Users\\s2986288\\OneDrive - Griffith University\\Software Development\\Documentation\\Card Interface Demo-Instructions"

STYLE_MAP = """
     p[style-name='Section Title'] => h1:fresh
     p[style-name='Quote'] => blockquote:fresh
     p[style-name='Quotations'] => blockquote:fresh
     p[style-name='Quotation'] => blockquote:fresh
     p[style-name='Body Text'] => p:fresh
     p[style-name='Text'] => p:fresh
     p[style-name='Default'] => p:fresh
     p[style-name='Normal (Web)'] => p:fresh
     p[style-name='Normal'] => p:fresh
     p[style-name='Text body'] => p:fresh
     p[style-name='Textbody1'] => p:fresh
     p[style-name='Picture'] => div.picture
     p[style-name='Picture Right'] => div.pictureRight
     p[style-name='PictureRight'] => div.pictureRight
     r[style-name='University Date'] => span.universityDate
     p[style-name='Video'] => div.video
     p[style-name='Film Watching Options'] => div.filmWatchingOptions
     r[style-name='Checkbox Char'] => span.checkbox
     p[style-name='Checkbox'] => span.checkbox
     p[style-name='ActivityTitle'] => div.activity > h2:fresh
     p[style-name='Activity Title'] => div.activity > h2:fresh
     p[style-name='ActivityText'] => div.activity > div.instructions > p:fresh
     p[style-name='Activity Text'] => div.activity > div.instructions > p:fresh
     p[style-name='Activity']:ordered-list(1) => div.activity > div.instructions > ol > li:fresh
     p[style-name='Activity']:unordered-list(1) => div.activity > div.instructions > ul > li:fresh
     p[style-name='Activity'] => div.activity > div.instructions > p:fresh
     p[style-name='Bibliography'] => div.apa > p:fresh
     p[style-name='Reading']:ordered-list(1) => div.reading > div.instructions > ol > li:fresh
     p[style-name='Reading']:unordered-list(1) => div.reading > div.instructions > ul > li:fresh
     p[style-name='Reading'] => div.reading > div.instructions > p:fresh
     p[style-name='Title'] => div.invisible
     p[style-name='Card'] => div.gu_card
     r[style-name='Emphasis'] => em:fresh
     p[style-name='Timeout'] => span.timeout
     p[style-name='Embed'] => span.embed
     p[style-name='Note']:ordered-list(1) => div.ael-note > div.instructions > ol > li:fresh
     p[style-name='Note']:unordered-list(1) => div.ael-note > div.instructions > ul > li:fresh
     p[style-name='Note'] => div.ael-note > div.instructions > p:fresh
     p[style-name='Blackboard Card'] => div.bbCard:fresh
     p[style-name='Heading 1'] => h2
     p[style-name='Blackboard Item Heading'] => h1.blackboard
     p[style-name='Blackboard Item Heading 2'] => h2.blackboard
     r[style-name='Blackboard Item Link'] => span.blackboardLink
     p[style-name='Blackboard Item Link'] => span.blackboardlink
     r[style-name='Blackboard Item Link Char'] => span.blackboardLink
     r[style-name='Blackboard Content Link'] => span.blackboardContentLink
     r[style-name='Blackboard Menu Link'] => span.blackboardMenuLink
     r[style-name='small'] => span.smallText
     r[style-name='StrongCentered'] => span.strongCentered
     r[style-name='Centered'] => span.centered
     u => u
"""

#-- what and why
#mammoth "${SOURCE}\Card Demo - update styles.docx" --output-format=markdown > "${DESTINATION}\whatWhy.md"o_html()

PAGES = [
    {
        "SOURCE" : r"%s\Card Demo - update styles.docx" % SOURCE,
        "DESTINATION" : r"%s\\whatWhy.md" % DESTINATION
    },
    {
        "SOURCE" : r"%s\001 - How to create cards\How to create cards.docx" % SOURCE,
        "DESTINATION" : r"%s\\createCards.md" % DESTINATION
    },
    {
        "SOURCE" : r"%s\002 - How to customise a card\How to customise individual cards.docx" % SOURCE,
        "DESTINATION" : r"%s\\customiseACard.md" % DESTINATION
    },
]

for page in PAGES: 
    with open( page["SOURCE"], "rb") as docx_file:
        result = mammoth.convert_to_html( docx_file)

        md = html2markdown.convert(result.value)
        with open( page["DESTINATION"], "w", encoding="utf-8") as md_file:
           md_file.write(md) 
#        print(result.value)