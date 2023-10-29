from PIL import Image

# Open the PNG image
image = Image.open("google-logo.png")

# Convert the image to RGBA mode (if it's not already)
image = image.convert("RGBA")

# Create a mask by checking for non-transparent pixels
mask = Image.new("L", image.size, 0)  # Initialize the mask with all zeros

# Loop through the image's alpha channel and set mask pixels to 255 for non-transparent pixels
for x in range(image.width):
    for y in range(image.height):
        if image.getpixel((x, y))[3] > 0:
            mask.putpixel((x, y), 255)

# Find bounding box of non-transparent region
bbox = mask.getbbox()

# Crop the image to the bounding box
cropped_image = image.crop(bbox)

# Save the cropped image
cropped_image.save("google-logo-cropped.png")

# Close the image
image.close()
