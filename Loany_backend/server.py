from flask import Flask, send_from_directory, request
import json
app = Flask(__name__)


allLoans = []
allUsers={}
openLoans = []

@app.route("/add_user", methods=['GET'])
def buyLoan():
	credit_score = request.args.get("credit_score")
	name = request.args.get("name")
	if name == None or credit_score == None:
		return("Invalid Input")
	allUsers[name] = [credit_score, 0]
	return("Request Successful")

@app.route('/buy_new_loan', methods=['GET'])
def buyNewLoan():
	name = request.args.get("name")
	amount = request.args.get("amount")
	rate = request.args.get("rate")
	if name == None or amount == None or rate == None:
		return("Invalid Input")
	print(allUsers)
	if name not in allUsers:
		return("User not valid")
	allUsers[name][1]+=1
	credit_score = allUsers[name][0]
	allLoans.append({"owner": name, "credit_score": credit_score, "rate": rate, "amount": amount, "purchased": False, "buyer": ""})
	openLoans.append({"owner": name, "credit_score": credit_score, "rate": rate, "amount": amount, "purchased": False, "buyer": ""})
	return("Request Successful")

@app.route('/searchUserLoans', methods=['GET'])
def searchUserLoans():
	name = request.args.get("name")
	if name == None or name not in allUsers:
		return("Invalid Input")
	loans_for_user = []
	total_loans = allUsers[name][1]
	j = 0
	for i in allLoans:
		if j == allUsers[name][1]:
			break
		if i['owner'] == name:
			j+=1
			loans_for_user.append(i)
	return json.dumps(loans_for_user)

@app.route('/displayAllLoans', methods=['GET'])
def displayAllLoans():
	return(json.dumps(allLoans))

@app.route('/displayUserLoans', methods=['GET'])
def displayUserLoans():
	name = request.args.get("name")
	if name == None:
		return("Invalid Input")
	all_non_name_loan = []
	for i in allLoans:
		if name == i["owner"]:
			print("matched")
		else:
			all_non_name_loan.append(i)
	return json.dumps(all_non_name_loan)

@app.route('/displayUserOwnedLoans', methods=['GET'])
def displayOwnedLoans():
	name = request.args.get("name")
	owned_loans = []
	if name == None:
		return("Invalid Input")
	for i in allLoans:
		if i["buyer"] == name:
			owned_loans.append(i)
	return json.dumps(owned_loans)

@app.route('/displayAvailableLoans', methods=['GET'])
def availableLoans():
	available_loans = []
	for i in allLoans:
		if i["buyer"] == "":
			available_loans.append(i)
	return json.dumps(available_loans)

@app.route('/buySelectedLoan', methods=['GET'])
def buySelectedLoan():
	name = request.args.get("name")
	amount = request.args.get("amount")
	rate = request.args.get("rate")
	for i in allLoans:
		if i['owner'] == name and i['amount'] == amount and i['rate'] == rate:
			i['buyer'] = name
			break
	for j in openLoans:
		if j['owner'] == name and j['amount'] == amount and j['rate'] == rate:
			openLoans.remove(j)
			break
	return("Success")




if __name__ == '__main__':
	app.run(use_reloader=True, port=4000, threaded=True, debug = True)
