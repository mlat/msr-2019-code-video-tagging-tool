## Video Scraping and Segmentation Tool ##

### Requirements ###  
Gather data using [PyTube](https://github.com/nficano/pytube) and [FFmpeg](https://www.ffmpeg.org/)
```
pip install pytube
sudo apt-get install ffmpeg
```
### links.txt File ###
This tool expects to find a file called links.txt, which should list the videos to pull
images from, one video per line, in the format:
Link | Video Name

#### To Run ####
```
python pull_videos.py
```
The above will iterate through the links in links.txt and split the videos into images
at a rate of 1 frame per second. It will create a Downloads folder in the working directory and the resulting images will be saved there, within folders named after the title of the video they came from and the video quality.

## Establishing the Database ##

1. Create the database codeVidTool
2. Import the provided sql dump mysqldump codeVidTool -u<username> -p > msr2019DumpUserRedacted.sql