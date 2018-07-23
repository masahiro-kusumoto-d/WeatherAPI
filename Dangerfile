# github comment settings
github.dismiss_out_of_range_messages

# for PR
if github.pr_title.include? "[WIP]" || github.pr_labels.include?("WIP")
  warn("PR is classed as Work in Progress") 
end

# Warn when PR has no assignees
warn("A pull request must have some assignees") if github.pr_json["assignee"].nil?

checkstyle_format.base_path = Dir.pwd
checkstyle_format.report 'app/build/reports/checkstyle/checkstyle.xml'