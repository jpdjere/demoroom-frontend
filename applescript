# input is the list of url's from the previous task
on run {input, parameters}

	# The below is an applescript loop
	repeat with theURL in input
		tell application "/Applications/Google Chrome.app"
			tell (make new window)
				set URL of active tab to theURL
				set bounds to {0, 22, 1200, 900}
			end tell
			activate
		end tell
		tell application "System Events"
			keystroke "f" using {command down, control down}
			delay 1
			keystroke "f" using {command down, shift down}
		end tell
		delay 1
	end repeat

	# We must return something so we just return the input
	return input

end run
