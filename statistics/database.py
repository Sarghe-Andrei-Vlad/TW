import mysql.connector
import csv
import xml.etree.ElementTree as ET

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="fosa_database"
)

cursor = db.cursor()

cursor.execute("SELECT COUNT(*) FROM Users")
total_users = cursor.fetchone()[0]

cursor.execute("SELECT AVG(rating), COUNT(*) FROM Reviews")
avg_rating, total_reviews = cursor.fetchone()

cursor.execute("SELECT type, COUNT(*) FROM Footwear GROUP BY type")
footwear_stats = cursor.fetchall()

cursor.close()
db.close()

print("Total Users:", total_users)
print("Average Rating:", avg_rating)
print("Total Reviews:", total_reviews)
print("Footwear Stats:", footwear_stats)


#HTML
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <title>FoSA Statistics</title>
</head>
<body>
    <h1>FoSA Statistics</h1>
    <h2>User Statistics</h2>
    <p>Total Users: {total_users}</p>
    
    <h2>Review Statistics</h2>
    <p>Average Rating: {avg_rating:.2f}</p>
    <p>Total Reviews: {total_reviews}</p>
    
    <h2>Footwear Statistics</h2>
    <table border="1">
        <tr>
            <th>Type</th>
            <th>Count</th>
        </tr>
        {''.join(f"<tr><td>{type}</td><td>{count}</td></tr>" for type, count in footwear_stats)}
    </table>
</body>
</html>
"""

with open('fosa_statistics.html', 'w') as f:
    f.write(html_content)

#csv
csv_file = 'fosa_statistics.csv'

with open(csv_file, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Metric', 'Value'])
    writer.writerow(['Total Users', total_users])
    writer.writerow(['Average Rating', avg_rating])
    writer.writerow(['Total Reviews', total_reviews])
    
    writer.writerow([])
    writer.writerow(['Footwear Type', 'Count'])
    for type, count in footwear_stats:
        writer.writerow([type, count])

#XML
root = ET.Element("FoSAStatistics")

user_stats = ET.SubElement(root, "UserStatistics")
total_users_elem = ET.SubElement(user_stats, "TotalUsers")
total_users_elem.text = str(total_users)

review_stats = ET.SubElement(root, "ReviewStatistics")
avg_rating_elem = ET.SubElement(review_stats, "AverageRating")
avg_rating_elem.text = f"{avg_rating:.2f}"
total_reviews_elem = ET.SubElement(review_stats, "TotalReviews")
total_reviews_elem.text = str(total_reviews)

footwear_stats_elem = ET.SubElement(root, "FootwearStatistics")
for type, count in footwear_stats:
    footwear_elem = ET.SubElement(footwear_stats_elem, "Footwear")
    type_elem = ET.SubElement(footwear_elem, "Type")
    type_elem.text = type
    count_elem = ET.SubElement(footwear_elem, "Count")
    count_elem.text = str(count)

tree = ET.ElementTree(root)
tree.write("fosa_statistics.xml")