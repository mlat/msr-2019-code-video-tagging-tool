### Adding New Data ###
1. Edit links.txt to contain links and titles for any new videos to be segmented
2. Run the scraping & segmenting tool to create new images.
3. Add a record to the datasets table of the database that names the new dataset formed by the images from step 2. Provide the programming language expected to be found within these videos.
4. Iteratively add each new image to the images table. (Also create records for these images in the image_given_records table)
5. Establish the web interface. The link to the tagging tool for the new images will include the name given to the dataset in step 3. Records will automatically be added to the responses table as images are tagged via the web interface.

### Generating Labeled Data ###
Selected a labeling mechanism and query the database for images which meet your criteria.