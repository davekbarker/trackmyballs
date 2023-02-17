import json

# Load the clubs.json file
with open('clubs.json', 'r') as f:
    clubs_data = json.load(f)

# Create a dictionary to store the direction values for each club
club_directions = {}

# Define a function to update the direction values for each club in the dictionary
def update_directions(club, direction):
    if club not in club_directions:
        # If this is the first time the club is selected, add it to the dictionary with direction as its value
        club_directions[club] = {"direction": direction, "hits": 1}
    else:
        # If the club has been selected before, add the new direction value to its existing direction value
        club_directions[club]["direction"] += direction
        club_directions[club]["hits"] += 1

# Prompt the user to select clubs and directions
while True:
    club = input("Enter a club: ")
    if not club:
        # If the user presses enter without entering a club, exit the loop
        break
    direction = int(input("Enter a direction value between 0 and 100: "))
    if not (0 <= direction <= 100):
        # If the user enters an invalid direction value, prompt them to enter it again
        print("Invalid direction value. Please enter a value between 0 and 100.")
        continue
    update_directions(club, direction)

# Calculate the average direction for each club and update the clubs.json file
for club in club_directions:
    # Divide the total direction value for the club by the number of hits to calculate the average direction
    avg_direction = club_directions[club]["direction"] / club_directions[club]["hits"]
    # Update the direction value for the club in the clubs.json file
    for c in clubs_data["clubs"]:
        if c["size"] == club:
            c["direction"] = avg_direction
            break

# Write the updated clubs.json data back to the file
with open('clubs.json', 'w') as f:
    json.dump(clubs_data, f, indent=2)
