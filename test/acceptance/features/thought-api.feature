Feature: As a user, I want to be able to create thoughts through the REST api
  Scenario: Thought created by POST to /thought
    Given No thoughts exist
    When A POST to /thought is performed
    Then A thought is persisted