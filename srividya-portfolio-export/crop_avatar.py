from PIL import Image

def crop_image():
    # Load original image
    img = Image.open(r'C:\Users\srivi\.gemini\antigravity-ide\brain\50e33a58-b4de-4967-b9d8-74ae9839f76c\media__1781695181001.jpg')
    
    # Crop to get the girl without mirror reflection (left of x=338)
    # y=70 to y=408 captures head, face, and shoulders nicely in a square aspect ratio
    cropped = img.crop((0, 70, 338, 408))
    
    # Save to public directory
    cropped.save(r'c:\Users\srivi\Downloads\srividya-portfolio-code\srividya-portfolio-export\public\avatar.jpg')
    print("Avatar cropped successfully!")

if __name__ == '__main__':
    crop_image()
