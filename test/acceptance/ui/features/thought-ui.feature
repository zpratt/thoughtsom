Feature: As a user, I want a user interface enable me to create and organize my thoughts

  Scenario: List of Thoughts

    Given a user
    When a GET request on /thought is performed
    Then a list of thoughts is returned

