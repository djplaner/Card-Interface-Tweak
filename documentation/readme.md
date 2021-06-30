# Documentation

This collection of Word documents provides the content for the help documentation for the Card Interface. 

The process for producing the help documentation is
1. Update the Word documents as required
2. Run the ~/site/util/update.py script to convert the Word documents into markdown used by mkdocs
3. Test the changes by running **mkdocs serve** and displaying changes on local host
4. Once happy, commit changes to github
5. Run **mkdocs gh-deploy**