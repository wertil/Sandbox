Python 3.7.4 (tags/v3.7.4:e09359112e, Jul  8 2019, 19:29:22) [MSC v.1916 32 bit (Intel)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
>>> number = "5,16,25,3,4,1"
>>> number
'5,16,25,3,4,1'
>>> number.split(",")
['5', '16', '25', '3', '4', '1']
>>> user_numbers = number.split(",")
>>> user_numbers
['5', '16', '25', '3', '4', '1']
>>> user_numbers_as_int = []
>>> for number in user_numbers:
	user_numbers_as_int.append(int(number))

	
>>> user_numbers_as_int
[5, 16, 25, 3, 4, 1]
>>> [number for number in user_numbers]
['5', '16', '25', '3', '4', '1']
>>> [int(number) for number in user_numbers]
[5, 16, 25, 3, 4, 1]
>>> 
